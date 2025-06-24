import json
import tornado.web
import decimal
import datetime
from db_config import get_connection

def custom_serializer(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")


class EmployeeHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "*")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

    async def get(self):
        try:
            conn = get_connection()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM employees")
            result = cursor.fetchall()
            conn.close()
            self.write(json.dumps(result, default=custom_serializer))
        except Exception as e:
            print("❌ GET error:", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))

    async def post(self):
        try:
            data = json.loads(self.request.body)
            conn = get_connection()
            cursor = conn.cursor()

            sql = """
                INSERT INTO employees (
                    full_name, email, phone_number, address, date_of_birth, joining_date,
                    job_title, department, project_assigned, team_lead, photo_url,
                    salary, role, payment_method, bank_account_details
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

            values = (
                data["full_name"], data["email"], data["phone_number"], data["address"],
                data["date_of_birth"], data["joining_date"], data["job_title"], data["department"],
                data["project_assigned"], data["team_lead"], data["photo_url"], data["salary"],
                data["role"], data["payment_method"], data["bank_account_details"]
            )

            cursor.execute(sql, values)
            conn.commit()
            conn.close()
            self.write(json.dumps({"message": "Employee added successfully"}))
        except Exception as e:
            print("❌ POST error:", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))

    async def put(self):
        try:
            data = json.loads(self.request.body)
            conn = get_connection()
            cursor = conn.cursor()

            sql = """
                UPDATE employees SET
                    full_name=%s, email=%s, phone_number=%s, address=%s,
                    date_of_birth=%s, joining_date=%s, job_title=%s, department=%s,
                    project_assigned=%s, team_lead=%s, photo_url=%s, salary=%s,
                    role=%s, payment_method=%s, bank_account_details=%s
                WHERE id=%s
            """

            values = (
                data["full_name"], data["email"], data["phone_number"], data["address"],
                data["date_of_birth"], data["joining_date"], data["job_title"], data["department"],
                data["project_assigned"], data["team_lead"], data["photo_url"], data["salary"],
                data["role"], data["payment_method"], data["bank_account_details"], data["id"]
            )

            cursor.execute(sql, values)
            conn.commit()
            conn.close()
            self.write(json.dumps({"message": "Employee updated successfully (HR)"}))
        except Exception as e:
            print("❌ PUT error (HR):", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))

    async def delete(self):
        try:
            employee_id = self.get_argument("id")
            conn = get_connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM employees WHERE id = %s", (employee_id,))
            conn.commit()
            conn.close()
            self.write(json.dumps({"message": "Employee deleted successfully"}))
        except Exception as e:
            print("❌ DELETE error:", e)
            self.set_status(500)
            self.write(json.dumps({"error": str(e)}))
