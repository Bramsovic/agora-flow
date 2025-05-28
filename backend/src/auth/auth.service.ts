import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.userRepository.findOne({ where: { email } });

    if (existing) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      passwordHash,
    });

    return this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe invalide.');
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
