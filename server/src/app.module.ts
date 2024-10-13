import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/_auth/auth.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PaymentModule } from './modules/payment/payment.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { MedicalRecordsModule } from './modules/medical-records/medical-records.module';
import { HealthCardModule } from './modules/health-card/health-card.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/db/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
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
export class AppModule {}
