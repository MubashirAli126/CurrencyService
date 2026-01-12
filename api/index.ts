import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../backend/src/app.module';
import * as express from 'express';
import { Handler } from '@vercel/node';

let cachedApp: express.Application;

async function createApp(): Promise<express.Application> {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Don't set global prefix - Vercel routes already handle /api prefix

  // Enable CORS for all origins in production
  app.enableCors({
    origin: true, // Allow all origins in production
    credentials: true,
  });

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

const handler: Handler = async (req, res) => {
  const app = await createApp();
  return app(req, res);
};

export default handler;
