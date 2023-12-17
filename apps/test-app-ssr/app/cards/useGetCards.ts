import { useQuery } from '@tanstack/react-query';

export function useGetCards() {
  const cardsQuery = useQuery({
    queryKey: ['cards'],
    queryFn: () => {
      return fetch('/api/cards').then((res) => res.json());
    },
  });

  return cardsQuery;
}
