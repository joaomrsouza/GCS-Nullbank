import { LogoText } from "@/components/icons/logo-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Metadata } from "next";
import { ClienteLoginForm } from "./_components/cliente-login-form";
import { FuncionarioLoginForm } from "./_components/funcionario-login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="grid h-screen grid-rows-[1fr]">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <LogoText className="h-16 w-fit" />
          <Tabs className="w-[400px]" defaultValue={"cliente"}>
            <TabsList>
              <TabsTrigger value="cliente">Sou um Cliente</TabsTrigger>
              <TabsTrigger value="funcionario">Sou um Funcionário</TabsTrigger>
            </TabsList>
            <TabsContent value="cliente">
              <ClienteLoginForm />
            </TabsContent>
            <TabsContent value="funcionario">
              <FuncionarioLoginForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
