import tkinter as tk
from tkinter import ttk, messagebox
from tkinter.font import BOLD
import util.generic as utl
from forms.form_master import MasterPanel
from tkinter.messagebox import showinfo,showerror
from bd.conexion import Conexion

class App:
        
    def verificar(self):
        username = self.usuario.get()
        password = self.password.get()
        
        try:
            db = Conexion()

            if db.buscar_usuario(username, password):
                showinfo(title = "Ingreso", message = "Ingreso autorizado")
                self.ventana.destroy()
                MasterPanel()
            else:
                showerror(title = "Advertencia", message = "Usuario o contraseña incorrectos")
            db.cerrar_bd()	
	
        except:
            showerror(title = "Advertencia", message = "Error de conexión a base de datos")
                        
    def __init__(self):        
        self.ventana = tk.Tk()                             
        self.ventana.title('DENTALMATIC')
        self.ventana.geometry('500x500')
        self.ventana.resizable(width=0, height=0)    
        utl.centrar_ventana(self.ventana, 600, 500)
        
        logo =utl.leer_imagen("./GUILogin/imagenes/logo1.png", (250, 200))
        # frame_logo
        frame_logo = tk.Frame(self.ventana, bd=0, width=300, relief=tk.SOLID, padx=10, pady=10,bg='#1F704B')
        frame_logo.pack(side="left", expand=tk.YES, fill=tk.BOTH)
        label = tk.Label( frame_logo, image=logo, bg='#1F704B' )
        label.place(x=0, y=0, relwidth=1, relheight=1)
        
        #frame_form
        frame_form = tk.Frame(self.ventana, bd=0, relief=tk.SOLID, bg='#fcfcfc')
        frame_form.pack(side="right", expand=tk.YES, fill=tk.BOTH)
        #frame_form
        
        #frame_form_top
        frame_form_top = tk.Frame(frame_form,height = 50, bd=0, relief=tk.SOLID, bg='black')
        frame_form_top.pack(side="top", fill=tk.X)
        title = tk.Label(frame_form_top, text="Inicio de sesion", font=('Comic Sans MS', 30), fg="#666a88", bg='#fcfcfc', pady=50)
        title.pack(expand=tk.YES,fill=tk.BOTH)
        #end frame_form_top

        #frame_form_fill
        frame_form_fill = tk.Frame(frame_form, height = 50,  bd=0, relief=tk.SOLID, bg='#fcfcfc')
        frame_form_fill.pack(side="bottom",expand=tk.YES,fill=tk.BOTH)

        etiqueta_usuario = tk.Label(frame_form_fill, text="Usuario", font=('Comic Sans MS', 14) ,fg="#666a88",bg='#fcfcfc', anchor="w")
        etiqueta_usuario.pack(fill=tk.X, padx=20,pady=5)
        self.usuario = ttk.Entry(frame_form_fill, font=('Comic Sans MS', 14))
        self.usuario.pack(fill=tk.X, padx=20, pady=10)

        etiqueta_password = tk.Label(frame_form_fill, text="Contraseña", font=('Comic Sans MS', 14),fg="#666a88",bg='#fcfcfc' , anchor="w")
        etiqueta_password.pack(fill=tk.X, padx=20, pady=5)
        self.password = ttk.Entry(frame_form_fill, font=('Comic Sans MS', 14))
        self.password.pack(fill=tk.X, padx=20,pady=10)
        self.password.config(show="*")

        inicio = tk.Button(frame_form_fill, text="Ingresar", font=('Comic Sans MS', 15, BOLD), bg='#1F704B', bd=0, fg="#fff", command=self.verificar)
        inicio.pack(fill=tk.X, padx=20, pady=20)        
        inicio.bind("<Return>", (lambda event: self.verificar()))
        #end frame_form_fill
        self.ventana.mainloop()
        
if __name__ == "__main__":
   App()