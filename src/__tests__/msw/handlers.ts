import { HttpResponse, http } from 'msw';
import json from './moc.json';

export const handlers = [
  http.get('*', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const pageSize = url.searchParams.get('pageSize');
    const query = url.searchParams.get('q');

    const match = query?.match(/name:(\w+)/);
    const name = match ? match[1] : null;

    if (name === 'pikachu' && page === '1' && pageSize === '6') {
      return HttpResponse.json(json);
    }

    return HttpResponse.json(json);
  }),

  http.get('/:id', ({ params }) => {
    const { id } = params;
    const pokemon = json.data.find((p) => p.id === id);

    return pokemon
      ? HttpResponse.json(pokemon)
      : HttpResponse.json({ error: 'Not found' }, { status: 404 });
  })
];
