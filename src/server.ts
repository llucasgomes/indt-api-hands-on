import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
//Instaciar o servidor
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

//Instaciar o servidor
const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>();

//Configurações
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

//rotas
server.get("/", (req: FastifyRequest, replay: FastifyReply) => {
  replay.status(200).send({ message: "servidor ok" });
});


//configurações de porta
server.listen(
  {
    port: 3000,
  },
  () => {
    console.log("Server runnig port 3000");
  }
);