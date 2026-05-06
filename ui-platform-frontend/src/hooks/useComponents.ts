import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios.instance';
import { ApiEndpoints } from '../api/endpoints.enum';
import type { UIComponent } from '../types/component';
import { toast } from 'react-hot-toast';

// Backend'e (NestJS) gönderilecek verinin tipi (ID hariç her şey)
// Bir Fullstack Developer olarak NestJS tarafındaki DTO mantığının aynısı diyebiliriz.
export type CreateComponentDTO = Omit<UIComponent, 'id'>;

// 1. Tüm bileşenleri getirir (Okuma)
export const useComponents = () => {
    return useQuery({
        queryKey: ['components'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<UIComponent[]>(ApiEndpoints.GET_ALL_COMPONENTS);
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

// 2. Slug'a göre tek bir bileşen getirir (Okuma)
export const useComponentBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['component', slug],
        queryFn: async () => {
            const { data } = await axiosInstance.get<UIComponent>(`${ApiEndpoints.GET_COMPONENT_BY_SLUG}/${slug}`);
            return data;
        },
        enabled: !!slug,
    });
};

// 3. YENİ: Yeni bileşen oluşturur (Yazma)
export const useCreateComponent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newComponent: CreateComponentDTO) => {
            const { data } = await axiosInstance.post<UIComponent>(ApiEndpoints.CREATE_COMPONENT, newComponent);
            return data;
        },
        // Başarılı olduğunda çalışacak kısım
        onSuccess: () => {
            // 'components' anahtarına sahip tüm query'leri geçersiz kıl
            // Bu sayede Sidebar listesi arka planda NestJS'ten tekrar çekilir
            queryClient.invalidateQueries({ queryKey: ['components'] });
            toast.success('Bileşen başarıyla oluşturuldu! ✨');
        },
        onError: (error) => {
            console.error('Bileşen oluşturulurken hata oluştu:', error);
            toast.error('Bileşen oluşturulamadı! ❌');
        }
    });
};

// 4. Var olan bir bileşeni günceller
export const useUpdateComponent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<UIComponent> }) => {
            const response = await axiosInstance.patch<UIComponent>(`${ApiEndpoints.UPDATE_COMPONENT}/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            // Listeyi ve aktif bileşeni yenile
            queryClient.invalidateQueries({ queryKey: ['components'] });
            queryClient.invalidateQueries({ queryKey: ['component'] });
            toast.success('Bileşen başarıyla güncellendi! 🚀');
        },
        onError: (error) => {
            console.error('Bileşen güncellenirken hata oluştu:', error);
            toast.error('Bileşen güncellenirken hata oluştu! ❌');
        }
    });
};

// 5. Bir bileşeni siler
export const useDeleteComponent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`${ApiEndpoints.DELETE_COMPONENT}/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['components'] });
            toast.success('Bileşen başarıyla silindi! 🗑️');
        },
        onError: (error) => {
            console.error('Bileşen silinirken hata oluştu:', error);
            toast.error('Bileşen silinemedi! ❌');
        }
    });
};