import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { listWebhooks } from "./routes/list-webhooks";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // credentials: true, //Permite que a gente envie automaticamente os cookies do cabeçalho do front para o back, evitar ficar adicionando manualmente os cookies
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Webhock Inspector API",
      description: "API for capturing and inspecting webhook requests",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
  routePrefix: "/docs",
});

app.register(listWebhooks);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("🔥 HTTP server running on http://localhost:3333!");
  console.log("📖 Docs available at http://localhost:3333/docs");
});
