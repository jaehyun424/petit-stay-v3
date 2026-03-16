import { z } from "zod";

export const bookingSchema = z.object({
  sitterId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  children: z
    .array(
      z.object({
        name: z.string().min(1, "Child name is required"),
        age: z.number().int().min(1).max(17),
        specialNotes: z.string().optional(),
      }),
    )
    .min(1, "At least one child is required")
    .max(2, "Maximum 2 children"),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    phone: z.string().min(1, "Emergency contact phone is required"),
    relationship: z.string().min(1, "Relationship is required"),
  }),
});

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  keywords: z.array(z.string()),
  comment: z.string().max(500).nullable().optional(),
});

export const signupSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const sessionReportSchema = z.object({
  bookingId: z.string().uuid(),
  checkInAt: z.string().min(1),
  activities: z.string().max(2000).nullable().optional(),
  moodBehavior: z.string().max(2000).nullable().optional(),
  sleepNotes: z.string().max(2000).nullable().optional(),
  additionalNotes: z.string().max(2000).nullable().optional(),
});
