"use client";

import { useActionState } from "react";
import { Field, Input } from "@/components/admin/ui/Field";
import { SubmitButton } from "@/components/admin/ui/SubmitButton";
import { signInAction, type AuthState } from "@/app/admin/actions/auth";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction] = useActionState<AuthState, FormData>(
    signInAction,
    null,
  );

  return (
    <form action={formAction} className="space-y-4">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      <Field label="البريد الإلكتروني" required>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="admin@smartech-group.com"
        />
      </Field>

      <Field label="كلمة المرور" required>
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </Field>

      {state && !state.ok && (
        <p className="text-xs text-rose-600 bg-rose-50 ring-1 ring-rose-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton className="w-full mt-1">دخول</SubmitButton>
    </form>
  );
}
