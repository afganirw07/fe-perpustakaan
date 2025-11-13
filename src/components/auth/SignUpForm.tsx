"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/Navbutton";
import { Card, CardContent } from "@/components/ui/card/card";
import { registerUser } from "@/lib/auth";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

    // register
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;
  const full_name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;

  try {
    const res = await registerUser({
      full_name,     
      email,
      password,
      role_user: "user", 
    });

    console.log("Berhasil daftar:", res);
  } catch (err) {
    console.error("Gagal daftar:", err);
  }
}


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Bagian Form */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Buat Akun Baru</h1>
              <p className="mt-1.5 md:text-center xs:text-lg text-[hsl(0_0%_45.1%)]">
                Daftar untuk mengakses layanan perpustakaan nasional
              </p>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  required
                />
              </Field>

              <Button type="submit" className="">
               Daftar
              </Button>

              <FieldSeparator>Atau daftar dengan</FieldSeparator>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" type="button">G</Button>
                <Button variant="outline" type="button">A</Button>
                <Button variant="outline" type="button">M</Button>
              </div>

              <FieldDescription className="text-center mt-2">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Masuk
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Gambar Samping */}
          <div className="relative hidden md:block">
            <Image
              src="/images/landing/hero.png"
              alt="Image"
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="text-center text-sm text-muted-foreground">
        Dengan mendaftar, Anda menyetujui{" "}
        <a href="#" className="text-primary font-bold hover:underline">
          Ketentuan Layanan
        </a>{" "}
        dan{" "}
        <a href="#" className="text-primary font-bold hover:underline">
          Kebijakan Privasi
        </a>
        .
      </FieldDescription>
    </div>
  );
}
