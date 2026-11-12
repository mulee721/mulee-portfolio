import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ServicesModule } from './modules/services/services.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { EducationModule } from './modules/education/education.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { ResumeModule } from './modules/resume/resume.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        if (!mongoUri) {
          throw new Error('MONGODB_URI is not defined in environment variables');
        }
        return {
          uri: mongoUri,
          retryAttempts: 3,
          retryDelay: 5000,
        };
      },
    }),

    // Feature modules
    AuthModule,
    AdminModule,
    ProfileModule,
    ProjectsModule,
    SkillsModule,
    ServicesModule,
    ExperienceModule,
    EducationModule,
    CertificatesModule,
    ResumeModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private authService: AuthService) {}

  async onModuleInit() {
    try {
      await this.authService.createDefaultAdmin();
      console.log('✅ Default admin initialized');
    } catch (error: any) {
      console.warn('⚠️ Could not initialize default admin:', error?.message);
    }
  }
}
