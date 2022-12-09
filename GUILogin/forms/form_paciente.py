import tkinter as tk
from tkinter.font import BOLD
import util.generic as utl
from tkinter import  Tk, Button, Entry, Label, ttk, PhotoImage
from tkinter import  StringVar,Scrollbar,Frame
from bd.conexion import Conexion

class Paciente:    
                                      
    def __init__(self):        
        #self.ventana = tk.Tk()
        self.ventana= tk.Toplevel()
        self.ventana.title('DentalMatic')
       # w, h = self.ventana.winfo_screenwidth(), self.ventana.winfo_screenheight()                                    
        self.ventana.geometry('1000x500')
        self.ventana.config(bg='#fcfcfc')
        self.ventana.resizable(width=0, height=0)
        utl.centrar_ventana(self.ventana,900,600)
        self.menu = True
        self.color = True
        self.frame_top = Frame(self.ventana, bg='black', height = 50)
        self.frame_top.grid(column = 1, row = 0, sticky='nsew')
        self.frame_principal = Frame(self.ventana, bg='white')
        self.frame_principal.grid(column=1, row=1, sticky='nsew')		
        self.ventana.columnconfigure(1, weight=1)
        self.ventana.rowconfigure(1, weight=1)
        self.frame_principal.columnconfigure(1, weight=1)
        self.frame_principal.rowconfigure(1, weight=1)
        self.titulo = Label(self.frame_top, text= 'Consultorio Odóntologico MyM', bg='black', fg= 'white', font= ('Comic Sans MS', 15, 'bold'))
        self.titulo.pack(expand=1)       

    #def pantalla_inicial(self):
    

    #def pantalla_datos(self):
             
    #def pantalla_escribir(self):
     
    #def pantalla_actualizar(self):
        
    
    #def pantalla_buscar(self):

   # def pantalla_ajustes(self):
    
    #def agregar_paciente():
        
		#BOTONES Y ETIQUETAS DEL MENU LATERAL
        Button(self.frame_principal, text= 'Pacientes', fg= 'white', bg='black', activebackground='black', bd=0).grid(column=0, row=1, pady=20,padx=10)
        Button(self.frame_principal, text= 'Pacientes', fg= 'white', bg='black',activebackground='black', bd=0 ).grid(column=0, row=2, pady=20,padx=10)
        Button(self.frame_principal, text= 'Pacientes', fg= 'white', bg= 'black',activebackground='black', bd=0 ).grid(column=0, row=3, pady=20,padx=10)
        Button(self.frame_principal, text= 'Pacientes', fg= 'white', bg= 'black',activebackground='black', bd=0).grid(column=0, row=4, pady=20,padx=10)
        Button(self.frame_principal, text= 'Pacientes', fg= 'white', bg= 'black',activebackground='black', bd=0).grid(column=0, row=5, pady=20,padx=10)

        Label(self.frame_principal, text= 'Pacientes', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=1, pady=20, padx=2)
        Label(self.frame_principal, text= 'Calendario', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=2, pady=20, padx=2)
        Label(self.frame_principal, text= 'Historia \nClinica', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=3, pady=20, padx=2)
        Label(self.frame_principal, text= 'Eliminar', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=4, pady=20, padx=2)
        Label(self.frame_principal, text= 'Versión', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=5, pady=20, padx=2)
        self.ventana.mainloop()
    
    #def agregar_paciente():
        

    '''    estilo_paginas = ttk.Style()
        estilo_paginas.configure("TNotebook", background='black', foreground='gray', padding=0, borderwidth=0)
        estilo_paginas.theme_use('default')
        estilo_paginas.configure("TNotebook", background='black', borderwidth=0)
        estilo_paginas.configure("TNotebook.Tab", background="black", borderwidth=0)
        estilo_paginas.map("TNotebook", background=[("selected", 'black')])
        estilo_paginas.map("TNotebook.Tab", background=[("selected", 'black')], foreground=[("selected", 'gray')]);

		#CREACCION DE LAS PAGINAS
        self.paginas = ttk.Notebook(self.frame_principal , style= 'TNotebook') #, style = 'TNotebook'
        self.paginas.grid(column=0,row=0, sticky='nsew')
        self.frame_uno = Frame(self.paginas, bg='white') #color de fondo
        self.frame_dos = Frame(self.paginas, bg='white') #color de fondo
        self.frame_tres = Frame(self.paginas, bg='white')
        self.frame_cuatro = Frame(self.paginas, bg='white')
        self.frame_cinco = Frame(self.paginas, bg='white')
        self.frame_seis = Frame(self.paginas, bg='white')
        self.paginas.add(self.frame_uno)
        self.paginas.add(self.frame_dos)
        self.paginas.add(self.frame_tres)
        self.paginas.add(self.frame_cuatro)
        self.paginas.add(self.frame_cinco)
        self.paginas.add(self.frame_seis)
	'''	
  ##############################         PAGINAS       #############################################
		######################## FRAME TITULO #################
        

		######################## VENTANA PRINCIPAL #################
        #Label(self.frame_principal, image= self.logo, bg='white').pack(expand= 1)

