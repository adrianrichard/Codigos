import tkinter as tk
from PIL import ImageTk, Image
from tkinter.messagebox import showinfo,showerror
import sqlite3
master = tk.Tk()
master.geometry("385x350")
def login():
	# Connect to database
	try:
		db = sqlite3.connect('login.db')
		c = db.cursor()
		username = lblusername.get()
		password = lblpassword.get()
		c.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))

		if c.fetchall():
			showinfo(title = "Ingreso", message = "Ingreso autorizado")
		else:
			showerror(title = "Advertencia", message = "Usuario o contraseña incorrectos")

		c.close()	
	
	except:
		showerror(title = "Advertencia", message = "Error de conexión a base de datos")

	


bg_color = "#5c8665"
fg_color = "black"
master.configure(background= bg_color)
master.title("DentalMatic")
#---heading image
photo = ImageTk.PhotoImage(Image.open("LOGO1.png"))
tk.Label(master, image=photo).grid(rowspan = 3, columnspan = 5, row =0,column = 0)
# -------username
tk.Label(master,  text="USUARIO", fg=fg_color, bg=bg_color, font=("Helvetica", 15)).grid(row=8, padx=(50, 0), pady=(20, 10))
lblusername = tk.Entry(master)
lblusername.grid(row=8, column=1, padx=(10, 10), pady=(20, 10))

# ----password
tk.Label(master,  text="CONTRASEÑA", fg=fg_color, bg=bg_color, font=("Helvetica", 15)).grid(row=9, padx=(50, 0), pady=(20, 10))
lblpassword = tk.Entry(master)
lblpassword['show']='*'
lblpassword.grid(row=9, column=1, padx=(10, 10),pady=(20, 10))

# --------button
tk.Button(master, text="Ingresar",borderwidth=3, relief='ridge', fg=fg_color, bg=bg_color, width = 15, command = login).grid(row = 10,  padx=(50, 0), pady=(20, 10))

master.mainloop()