# FSD Experiments

Full Stack Development lab experiments, organized one folder per experiment.

| Experiment | Folder | Stack | Notes |
|-----------|--------|-------|-------|
| 1 | [`exp-1/`](exp-1/) | React (CRA) | Frontend app |
| 2 | [`exp-2/`](exp-2/) | React + Vite + Redux store | Frontend app |
| 3 | [`exp-3/`](exp-3/) | React + Vite + TypeScript, auth context | Frontend app |
| 4 | [`exp-4/`](exp-4/) | React + Vite | Frontend app |
| 5 | [`exp-5/`](exp-5/) | React (Vite) + Spring Boot (Gradle) | Full stack |
| 6 | [`exp-6/`](exp-6/) | React (Vite) + Spring Boot (Maven) | Student task manager |
| 7 | [`exp-7/`](exp-7/) | React (Vite) + Spring Boot, JWT auth + AES | Full stack |
| 8 | [`exp-8/`](exp-8/) | React (Vite) + Spring Boot + Kafka | Scheduled posts, docker-compose |
| 9 | [`exp-9/`](exp-9/) | React (Vite) + Spring Boot, CI/CD | Testcontainers, canary, docker-compose |

> Experiment 10 to be added later.

## Running an experiment

Each folder is self-contained. Typical steps:

**Frontend (Vite / CRA):**
```bash
cd exp-<n>/frontend   # or exp-<n> for frontend-only experiments (1–4)
npm install
npm run dev           # CRA experiments use: npm start
```

**Backend (Spring Boot):**
```bash
cd exp-<n>/backend
./gradlew bootRun      # Gradle (exp-5)
./mvnw spring-boot:run # Maven (exp-6, 7, 8, 9)
```

Experiments with a `docker-compose.yml` (8, 9) can bring up their supporting
services with `docker compose up`. See each experiment's `INSTRUCTIONS.md` /
`setup_instructions.md` for specifics.

> `node_modules/` and build output are intentionally excluded — run
> `npm install` / the build to regenerate them.
