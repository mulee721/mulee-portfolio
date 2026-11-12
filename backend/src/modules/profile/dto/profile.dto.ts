import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  title: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  profileImage: string;

  @IsOptional()
  coverImage: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  location: string;

  @IsOptional()
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export class UpdateProfileDto extends CreateProfileDto {
  @IsOptional()
  status: 'draft' | 'published';
}
