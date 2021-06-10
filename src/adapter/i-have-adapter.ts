import { AnyClientAdapter } from './client-adapter';

export interface IHaveAdapter<
    TAdapter extends AnyClientAdapter
> {
    adapter: TAdapter;
}