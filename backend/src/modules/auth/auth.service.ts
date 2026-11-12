import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Admin } from './schemas/admin.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.adminModel.findOne({ email: email.toLowerCase() });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Update last login
    await this.adminModel.updateOne({ _id: admin._id }, { lastLogin: new Date() });

    const payload = {
      sub: admin._id,
      email: admin.email,
      role: admin.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async validateAdmin(id: string): Promise<Admin> {
    return this.adminModel.findById(id);
  }

  async createDefaultAdmin() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL', 'admin@portfolio.com');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD', 'Admin@123456');

    const existingAdmin = await this.adminModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      return existingAdmin;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new this.adminModel({
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      isActive: true,
      role: 'admin',
    });

    return admin.save();
  }
}
