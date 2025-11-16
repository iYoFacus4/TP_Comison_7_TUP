import { apiClient } from "./apiClient";
import { fakeHttpService } from "./fakeHttpService";

const USE_FAKE_API = true;

export const httpClient = USE_FAKE_API ? fakeHttpService : apiClient;

export default httpClient;
