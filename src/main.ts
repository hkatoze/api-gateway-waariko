import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: "*", // ⚠️ à restreindre en prod
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // true seulement si cookies
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
