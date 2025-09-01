// Repository factory - chooses implementation based on config
import { HttpClient } from "@/lib/http/client";
import { HttpMemoriasRepository } from "./http";
import { MockMemoriasRepository } from "./mock";
import { MemoriasRepository } from "./index";
import { API_BASE_URL, USE_MOCK } from "@/config/env";

const http = new HttpClient(API_BASE_URL);

export const memoriasRepo: MemoriasRepository = USE_MOCK 
  ? new MockMemoriasRepository() 
  : new HttpMemoriasRepository(http);