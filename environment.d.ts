declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_SERVICE_ID: string;
			NEXT_PUBLIC_TEMPLATE_ID: string;
			NEXT_PUBLIC_PUBLIC_KEY: string;
			NODE_ENV: "development" | "production";
			PORT?: string;
			PWD: string;
		}
	}
}

export {};
