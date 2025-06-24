import json
import tornado.web
from db_config import get_connection


class ManagerUpdateHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "PUT, OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "*")

    def options(self):
        self.set_status(204)
        self.finish()
    async def get(self):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("""
                SELECT id, full_name, email, phone_number, job_title, department,
                       joining_date, team_lead, photo_url
                FROM employees
            """)
            result = cursor.fetchall()
            conn.close()

            self.write(json.dumps(result))
        except Exception as e:
            print("❌ GET error (Manager):", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))
    

    async def put(self):
        try:
            data = json.loads(self.request.body)
            conn = get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE employees SET
                    project_assigned=%s,
                    team_lead=%s,
                    role=%s,
                    salary=%s
                WHERE id=%s
            """

            values = (
                data["project_assigned"],
                data["team_lead"],
                data["role"],
                data["salary"],
                data["id"]
            )

            cursor.execute(sql, values)
            conn.commit()
            conn.close()
            self.write(json.dumps({"message": "Employee updated successfully (Manager)"}))
        except Exception as e:
            print("❌ PUT error (Manager):", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))
