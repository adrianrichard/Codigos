import tkinter as tk
from PIL import ImageTk, Image
from tkinter.messagebox import showinfo,showerror
import sqlite3
root = tk.Tk()
root.geometry("385x350")
root.resizable(width=False, height=False)#para que no puedan modificar el tamaño

def login():
	# Connect to database
	try:
		db = sqlite3.connect('login.db')
		c = db.cursor()
		username = getusername.get()
		password = getpassword.get()
		c.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))

		if c.fetchall():
			showinfo(title = "Ingreso", message = "Ingreso autorizado")
		else:
			showerror(title = "Advertencia", message = "Usuario o contraseña incorrectos")

		c.close()	
	
	except:
		showerror(title = "Advertencia", message = "Error de conexión a base de datos")

	


bg_color = "#03592f"
fg_color = "black"
root.configure(background= bg_color)
root.title("DentalMatic")
#---heading image
photo = ImageTk.PhotoImage(Image.open("./Imagenes/LOGO1.png"))
tk.Label(root, image=photo).grid(rowspan = 3, columnspan = 5, row =0,column = 0)
# -------username
tk.Label(root,  text="Usuario", fg=fg_color, bg=bg_color, font=("Helvetica", 15)).grid(row=8, padx=(50, 0), pady=(20, 10))
getusername = tk.Entry(root)
#separar el Entry del grid porque sino no funciona
getusername.grid(row=8, column=1, padx=(10, 10), pady=(20, 10))

# ----password
tk.Label(root,  text="PASSWORD", fg=fg_color, bg=bg_color, font=("Helvetica", 15)).grid(row=9, padx=(50, 0), pady=(20, 10))
getpassword = tk.Entry(root, show='*')
#separa el Entry del grid porque sino no funciona
getpassword.grid(row=9, column=1, padx=(10, 10),pady=(20, 10))

# --------button
tk.Button(root, text="Ingresar",borderwidth=3, relief='ridge', fg=fg_color, bg=bg_color, width = 15, command = login).grid(row = 10,  padx=(50, 0), pady=(20, 10))

root.mainloop()