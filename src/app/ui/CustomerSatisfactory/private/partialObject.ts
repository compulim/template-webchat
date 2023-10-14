import { object, partial } from 'valibot';

export default function partialObject(...args: Parameters<typeof object>) {
  return partial(object(...args));
}
