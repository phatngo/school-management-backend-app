# Docker Setup for School Management API

## Overview
This setup includes:
- **Node.js Application** running on port 3000
- **MySQL Database** running on port 3306
- Both services connected via a custom Docker network

## Prerequisites
- Docker installed and running
- Docker Compose installed

## Quick Start

### 1. Build and Start Services
```bash
docker-compose up --build
```

This command will:
- Build the Node.js application image
- Start MySQL database container
- Start the Node.js app container
- Initialize the database with schema from `db.sql`
- Wait for the database to be healthy before starting the app

### 2. Verify Services are Running
```bash
docker-compose ps
```

### 3. Access the Application
- **API Base URL**: `http://localhost:3000`
- **Database**: `localhost:3306`

## Database Connection Details
- **Host**: `db` (or `localhost` from your machine)
- **Port**: `3306`
- **Username**: `school_user`
- **Password**: `school_password`
- **Database**: `school_db`
- **Root Password**: `root_password`

## Common Commands

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volume (Delete Database)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs app
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f
```

### Restart Services
```bash
docker-compose restart
```

### Remove and Rebuild
```bash
docker-compose down -v
docker-compose up --build
```

## Environment Variables
The following environment variables are configured in `docker-compose.yml`:

| Variable | Value |
|----------|-------|
| `DB_HOST` | `db` |
| `DB_USERNAME` | `school_user` |
| `DB_PASSWORD` | `school_password` |
| `DB_NAME` | `school_db` |
| `NODE_ENV` | `development` |

To change these values, edit the `environment` section in `docker-compose.yml`.

## Development Tips

### Hot Reload
The current setup mounts your source code in the container and includes a volume for `node_modules`. Changes to your code will be reflected when the app restarts.

### Run Commands in Container
```bash
# Access app container shell
docker exec -it school_management_app sh

# Access database container
docker exec -it school_management_db mysql -u school_user -p school_db
```

### Database Initialization
The database is automatically initialized using the `db.sql` file when the container starts. To reinitialize:
```bash
docker-compose down -v
docker-compose up
```

## Troubleshooting

### Connection Refused Error
- Ensure the database is healthy: `docker-compose logs db`
- Wait a few seconds for the database to fully initialize
- Check that port 3306 is not in use by another service

### Port Already in Use
Change the port bindings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # API on 3001
  - "3307:3306"  # Database on 3307
```

### Database Not Initialized
Check the logs:
```bash
docker-compose logs db
```

## File Structure
```
.
├── Dockerfile                 # Node.js app container config
├── docker-compose.yml         # Service orchestration
├── .dockerignore              # Files to exclude from build
├── db.sql                     # Database schema & seed data
├── package.json               # Node.js dependencies
├── app.js                     # Express application
└── ...other app files
```
