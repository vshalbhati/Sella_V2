import {createClient} from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_PROJECT_ID,SANITY_DATASET,SANITY_API_VERSION } from '@env';


const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: true,
    apiVersion:SANITY_API_VERSION
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;