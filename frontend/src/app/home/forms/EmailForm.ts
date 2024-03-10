import * as z from "zod";

export const EmailFormSchema = z.object({
    remetente: z
      .string()
      .email({ message: "O email inserido não é válido" }),
    destinatario: z
      .string()
      .email({ message: "O email inserido não é válido" }),
    assunto: z
      .string()
      .min(1, { message: "O campo nome deve ter no mínimo 1 caracteres" }),
    corpoEmail: z
      .string()
      .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
  });
  
  export type EmailFormType = z.infer<typeof EmailFormSchema>;
  
  