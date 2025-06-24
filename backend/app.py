import tornado.ioloop
import tornado.web
from handlers.employee_handler import EmployeeHandler
from handlers.manager_handler import ManagerUpdateHandler  

def make_app():
    return tornado.web.Application([
        (r"/employees", EmployeeHandler),              
        (r"/employees/manager", ManagerUpdateHandler)  
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    print("Tornado server running at http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
