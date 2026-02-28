"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchProductBySlug, createProduct, updateProduct, deleteProduct, fetchSkills, fetchProfile, updateAdminProfile } from "@/lib/api";

export function useProducts(params?: { category?: string; sort?: string }) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => fetchProducts(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateAdminProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
