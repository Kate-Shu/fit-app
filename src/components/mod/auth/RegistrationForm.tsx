'use client'

import * as React from "react";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { RegisterUser } from "@/app/actions/register";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type RegistrationFormType = {
  onClose: () => void
}
const RegistrationForm: React.FC<RegistrationFormType> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const result = await RegisterUser(formData)
    console.log('result is: ', result)
    onClose()
  };

  const validateEmail = (email: string) => {
    return emailRegex.test(email)
  }
  return (
    <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
      {/* email */}
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        classNames={{
          base: "group",
          inputWrapper: "!bg-amber-950/55 border border-border transition-colors" +
            "group-data-[hover=true]:!bg-amber-950/70 " +
            "group-data-[focus=true]:!bg-amber-900/60",
          input: 'text-sm, focus:outline-none',
          label: "!text-text-main"
        }}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        validate={value => {
          if (!value) return 'email is required'
          if (!validateEmail(value)) return 'Incorrect email format'
          return null
        }}
      />
      {/* password */}
      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={formData.password}
        classNames={{
          base: "group",
          inputWrapper: "!bg-amber-950/55 border border-border transition-colors" +
            "group-data-[hover=true]:!bg-amber-950/70 " +
            "group-data-[focus=true]:!bg-amber-900/60",
          input: 'text-sm, text-text-main, focus:outline-none',
          label: "!text-text-main"
        }}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        validate={value => {
          if (!value) return 'password is required'
          if (value.length < 1) return 'Password should be not less than 6 symbols'
          return null
        }}
      />
      {/* Cofirm password */}
      <Input
        isRequired
        label="Confirm password"
        labelPlacement="outside"
        name="confirmPassword"
        placeholder="Confirm your password"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          base: "group",
          inputWrapper: "!bg-amber-950/55 border border-border transition-colors" +
            "group-data-[hover=true]:!bg-amber-950/70 " +
            "group-data-[focus=true]:!bg-amber-900/50",
          input: 'text-sm, focus:outline-none',
          label: "!text-text-main",
        }}
        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
        validate={value => {
          if (!value) return 'password confirmation is required'
          if (value !== formData.password) return 'Passwords do not match '
          return null
        }}
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose} className="text-text-main hover:text-text-light hover:!bg-transparent border border-border rounded-lg">
          Cancel
        </Button>
        <Button type="submit" className="text-text-main hover:text-text-light bg-amber-950/55 hover:bg-amber-950/70 border border-border rounded-lg">
          Submit
        </Button>
      </div>
    </Form>
  );
}
export default RegistrationForm