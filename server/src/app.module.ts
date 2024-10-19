import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DigitalCardModule } from './modules/health-card/health-card.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PatientModule } from './modules/patient/patient.module';
import { AuthModule } from './modules/_auth/auth.module';
import { UserModule } from './modules/user/user.module';
import * as session from 'express-session';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AppointmentModule,
    PaymentModule,
    DoctorModule,
    PatientModule,
    MedicalRecordsModule,
    HealthCardModule,
    UserModule,
    PrismaModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 } // 1 hour
      }))
      .forRoutes('*');
  }
}
