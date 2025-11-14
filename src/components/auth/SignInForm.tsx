"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/Navbutton";
import { Card, CardContent } from "@/components/ui/card/card";
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
import * as z from "zod";
import { loginUser } from "@/lib/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const userLoginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Kata sandi harus terdiri dari minimal 8 karakter"),
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const validationResult = userLoginSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const errors = Object.values(fieldErrors).flat().join(", ");
      console.error(`Validasi gagal: ${errors}`);
      return;
    }

    try {
      const { email, password } = validationResult.data;
      const res = await loginUser(email, password);
      console.log("Berhasil masuk:", res);
    } catch (err) {
      console.error("Gagal masuk:", err); // Log error for debugging
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Bagian Form */}
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 p-6 md:p-10 relative">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Selamat Datang</h1>
              <p className="mt-1.5 md:text-center xs:text-lg text-[hsl(0_0%_45.1%)]">
                Masuk ke akun perpustakaan nasional
              </p>
            </div>

            <FieldGroup>
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
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                  <a
                    href="#"
                    className="text-sm text-primary font-bold hover:underline"
                  >
                    Lupa sandi?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>

              <Button type="submit" className="w-full mt-2">
                Masuk
              </Button>

              <FieldSeparator>Atau lanjutkan dengan</FieldSeparator>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" type="button">G</Button>
                <Button variant="outline" type="button">A</Button>
                <Button variant="outline" type="button">M</Button>
              </div>

              <FieldDescription className="text-center mt-2">
                Belum punya akun?{" "}
                <Link href="/register" className="text-primary font-bold hover:underline">
                  Daftar
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
        Dengan melanjutkan, Anda menyetujui{" "}
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
