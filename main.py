from app_config import app,socketio
import routes
import sockets
def show_routes () : 
    print("\nendpoints:")
    for rule in app.url_map.iter_rules() : 
        print(rule)
    print("\n")
    
show_routes()

if __name__ == "__main__" : 
    socketio.run(
        app,
        debug=False,
        host="0.0.0.0",
        port=3555,
        ssl_context="adhoc"
        )

