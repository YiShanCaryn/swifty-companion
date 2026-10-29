.PHONY: dev frontend backend

dev:
	@npm start & frontend_pid=$$!; \
	(cd backend && node server.js) & backend_pid=$$!; \
	trap 'trap - INT TERM EXIT; kill "$$frontend_pid" "$$backend_pid" 2>/dev/null; wait "$$frontend_pid" "$$backend_pid" 2>/dev/null' INT TERM EXIT; \
	wait

frontend:
	npm start

backend:
	cd backend && node server.js