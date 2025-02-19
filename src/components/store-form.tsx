"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Computer, Globe, Mail, MapPin, Store, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Store name must be at least 3 characters long",
  }),
  domain: z.string().min(3, {
    message: "Domain must be at least 3 characters long",
  }),
  country: z.string({
    required_error: "Please select a country",
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
  currency: z.string({
    required_error: "Please select a currency",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export default function StoreForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isChecking, setIsChecking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
      email: "",
      country: "Bangladesh",
      category: "Fashion",
      currency: "BDT",
    },
  })

  const checkDomain = async (domain: string) => {
    setIsChecking(true)
    try {
      const response = await axios.get(
        `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`,
      )
      return response.data.data.taken
    } catch (error) {
      console.error("Domain check failed:", error)
      return true // Assume domain is taken on error
    } finally {
      setIsChecking(false)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Check domain availability first
      const isDomainTaken = await checkDomain(values.domain)

      if (isDomainTaken) {
        form.setError("domain", {
          type: "manual",
          message: "Domain not available",
        })
        return;
      }

      // If domain is not taken, proceed with form submission
      const response = await axios.post("https://interview-task-green.vercel.app/task/stores/create", {
        name: values.name,
        currency: values.currency,
        country: values.country,
        domain: values.domain,
        category: values.category,
        email: values.email,
      })

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "Store created successfully",
        })
        router.push("/products")
      }
    } catch (error) {
      console.error("Store creation failed:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Create a store</h3>
        <p className="text-sm text-muted-foreground">Add your basic store information and complete the setup</p>
      </div>
      <div className="p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Give your online store a name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="How'd you like to call your store?" {...field} />
                  </FormControl>
                  <FormDescription>
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Your online store subdomain
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input {...field} disabled={isChecking} />
                      <div className="flex items-center px-3 border rounded-r bg-muted">
                        {isChecking ? "Checking..." : ".expressitbd.com"}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and
                    products.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Where&apos;s your store located?
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set your store&apos;s default location so we can optimize store access and speed for your customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Computer className="h-4 w-4" />
                    What&apos;s your Category?
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set your store&apos;s default category so that we can optimize store access and speed for your
                    customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Choose store currency
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BDT">BDT (Taka)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>This is the main currency you wish to sell in.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Store contact email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the email you&apos;ll use to send notifications to and receive orders from customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating store..." : "Create store"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

