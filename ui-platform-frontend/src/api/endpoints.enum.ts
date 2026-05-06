export const ApiEndpoints = {
    // Components
    GET_ALL_COMPONENTS: '/components',
    GET_COMPONENT_BY_SLUG: '/components/slug',
    CREATE_COMPONENT: '/components',
    UPDATE_COMPONENT: '/components',
    DELETE_COMPONENT: '/components',
} as const;

// Eğer başka bir yerde bu endpoint'lerin tiplerine ihtiyaç duyarsan diye tipini de dışarı aktarıyoruz
export type ApiEndpoint = typeof ApiEndpoints[keyof typeof ApiEndpoints];