"use client";

import React, { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProducts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Save, 
  User, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { data: profile, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setValue("full_name", profile.full_name);
      setValue("title", profile.title);
      setValue("bio", profile.bio);
      setPreviewUrl(profile.avatar_url);
    }
  }, [profile, setValue]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar[0]) {
      const file = avatar[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [avatar]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("title", data.title);
    formData.append("bio", data.bio);
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile configuration updated successfully.");
      },
      onError: (error: any) => {
        toast.error("Update failed: " + (error.response?.data?.error || error.message));
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-neon-cyan" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            System <span className="text-neon-cyan">Configuration</span>
          </h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-widest">Global Profile & Core Assets</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Avatar Sidebar */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-xl h-fit lg:sticky lg:top-8">
            <CardHeader>
              <CardTitle className="text-white uppercase tracking-tighter text-sm">Visual Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative group mx-auto w-48 h-48">
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <User className="w-12 h-12 text-white/20" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl"
                >
                  <div className="flex flex-col items-center gap-2 text-white">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase">Change Image</span>
                  </div>
                </label>
                <input 
                  {...register("avatar")}
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <p className="text-[10px] text-center text-white/40 uppercase tracking-tighter">
                Highly recommended: 512x512px, transparent background
              </p>
            </CardContent>
          </Card>

          {/* Core Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white uppercase tracking-tighter">Core Directives</CardTitle>
                <CardDescription className="text-white/40 uppercase text-[10px] tracking-widest">Primary Identity Configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-white/70 uppercase text-xs font-bold">Public Alias</Label>
                  <Input 
                    {...register("full_name", { required: "Full Name is mandatory" })}
                    id="full_name"
                    className="bg-white/5 border-white/10 text-white focus:border-neon-cyan transition-colors"
                    placeholder="Seng Noeun"
                  />
                  {errors.full_name && <span className="text-[10px] text-rose-500 uppercase">{errors.full_name.message as string}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white/70 uppercase text-xs font-bold">Designation</Label>
                  <Input 
                    {...register("title", { required: "Title is mandatory" })}
                    id="title"
                    className="bg-white/5 border-white/10 text-white focus:border-neon-cyan transition-colors"
                    placeholder="Full Stack Developer"
                  />
                  {errors.title && <span className="text-[10px] text-rose-500 uppercase">{errors.title.message as string}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white/70 uppercase text-xs font-bold">Biographical Data</Label>
                  <Textarea 
                    {...register("bio", { required: "Bio is mandatory" })}
                    id="bio"
                    rows={6}
                    className="bg-white/5 border-white/10 text-white focus:border-neon-cyan transition-colors resize-none"
                    placeholder="Tell the world who you are..."
                  />
                  {errors.bio && <span className="text-[10px] text-rose-500 uppercase">{errors.bio.message as string}</span>}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="border-white/10 hover:bg-white/5 text-white/60"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button 
                disabled={isPending}
                type="submit" 
                className="bg-white text-black font-black uppercase tracking-tighter hover:bg-neon-cyan transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Commit Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
