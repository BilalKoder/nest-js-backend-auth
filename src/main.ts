import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Backend APIs')
  .setDescription('Ezegenerator Project')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

 // Enable CORS with specific policies
  app.enableCors({
    origin: '*', // Replace '*' with a specific domain for stricter security
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
