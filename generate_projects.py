import requests
import json
from datetime import datetime

# Replace 'nederliver' with your actual Modrinth username
USERNAME = 'nederliver'

# Mapping of project categories or types to title colors
# You can customize this mapping based on your preferences
TITLE_COLOR_MAPPING = {
    'datapack': 'foam',
    'modpack': 'iris',
    # Add more mappings as needed
}

def fetch_user_projects(username):
    # Step 1: Get user ID from username
    user_url = f"https://api.modrinth.com/v2/user/{username}"
    user_response = requests.get(user_url)
    if user_response.status_code != 200:
        print(f"Failed to fetch user data: {user_response.status_code}")
        return []

    user_data = user_response.json()
    user_id = user_data.get('id')
    if not user_id:
        print("User ID not found.")
        return []

    # Step 2: Fetch projects associated with the user
    projects_url = f"https://api.modrinth.com/v2/user/{user_id}/projects"
    projects_response = requests.get(projects_url)
    if projects_response.status_code != 200:
        print(f"Failed to fetch projects: {projects_response.status_code}")
        return []

    projects = projects_response.json()
    return projects

def process_projects(projects):
    processed = []
    for project in projects:
        # Filter out archived projects
        if project.get('deprecated'):
            continue

        title = project.get('title')
        date_str = project.get('published')  # ISO 8601 format
        description = project.get('description')
        slug = project.get('slug')  # For constructing the link
        project_type = project.get('project_type')  # e.g., datapack, modpack

        # Convert ISO 8601 date to YYYY-MM-DD
        try:
            date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            formatted_date = date_obj.strftime('%Y-%m-%d')
        except Exception as e:
            print(f"Error parsing date for project '{title}': {e}")
            formatted_date = "2024-01-01"  # Default date or handle accordingly

        # Construct Modrinth link based on project type
        if project_type == 'datapack':
            modrinth_link = f"https://modrinth.com/datapack/{slug}"
        elif project_type == 'modpack':
            modrinth_link = f"https://modrinth.com/modpack/{slug}"
        else:
            modrinth_link = f"https://modrinth.com/project/{slug}"  # Generic link

        # Determine title color based on project type
        title_color = TITLE_COLOR_MAPPING.get(project_type, 'pine')  # Default to 'pine'

        processed.append({
            "title": title,
            "date": formatted_date,
            "description": description,
            "modrinthLink": modrinth_link,
            "titleColor": title_color
        })

    return processed

def generate_projects_json(processed_projects, filename='projects.json'):
    data = {
        "projects": processed_projects
    }
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Generated {filename} with {len(processed_projects)} projects.")

if __name__ == "__main__":
    projects = fetch_user_projects(USERNAME)
    if projects:
        processed = process_projects(projects)
        generate_projects_json(processed)
    else:
        print("No projects found or failed to fetch projects.")
