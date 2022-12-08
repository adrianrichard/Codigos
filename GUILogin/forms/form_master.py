import tkinter as tk
from tkinter.font import BOLD
import util.generic as utl
from tkinter import  Tk, Button, Entry, Label, ttk, PhotoImage
from tkinter import  StringVar,Scrollbar,Frame
#from conexion import*
import time

class MasterPanel:    
                                      
    def __init__(self):        
        self.ventana = tk.Tk()                             
        self.ventana.title('DentalMatic')
       # w, h = self.ventana.winfo_screenwidth(), self.ventana.winfo_screenheight()                                    
        self.ventana.geometry('1000x500+180+80')
        self.ventana.config(bg='#fcfcfc')
        self.ventana.resizable(width=0, height=0)
        utl.centrar_ventana(self.ventana,900,600)            
        self.menu = True
        self.color = True
        self.codigo = StringVar()
        self.nombre = StringVar()
        self.modelo = StringVar()
        self.precio = StringVar()
        self.cantidad = StringVar()
        self.buscar = StringVar()
        self.buscar_actualiza =  StringVar()
        self.id = StringVar()

		#self.base_datos = Registro_datos()

        self.frame_inicio = Frame(self.ventana, bg='black', width=50, height=45)
        self.frame_inicio.grid_propagate(0)
        self.frame_inicio.grid(column=0, row = 0, sticky='nsew')
        self.frame_menu = Frame(self.ventana, bg='black', width = 50)
        self.frame_menu.grid_propagate(0)
        self.frame_menu.grid(column=0, row = 1, sticky='nsew')
        self.frame_top = Frame(self.ventana, bg='black', height = 50)
        self.frame_top.grid(column = 1, row = 0, sticky='nsew')
        self.frame_principal = Frame(self.ventana, bg='black')
        self.frame_principal.grid(column=1, row=1, sticky='nsew')		
        self.ventana.columnconfigure(1, weight=1)
        self.ventana.rowconfigure(1, weight=1)
        self.frame_principal.columnconfigure(0, weight=1)
        self.frame_principal.rowconfigure(0, weight=1)
        
        self.widgets()


    def pantalla_inicial(self):
        self.paginas.select([self.frame_uno])

    def pantalla_datos(self):
        self.paginas.select([self.frame_dos])
        self.frame_dos.columnconfigure(0, weight=1)
        self.frame_dos.columnconfigure(1, weight=1)
        self.frame_dos.rowconfigure(2, weight=1)
        self.frame_tabla_uno.columnconfigure(0, weight=1)
        self.frame_tabla_uno.rowconfigure(0, weight=1)

    def pantalla_escribir(self):
        self.paginas.select([self.frame_tres])
        self.frame_tres.columnconfigure(0, weight=1)
        self.frame_tres.columnconfigure(1, weight=1)

    def pantalla_actualizar(self):
        self.paginas.select([self.frame_cuatro])
        self.frame_cuatro.columnconfigure(0, weight=1)
        self.frame_cuatro.columnconfigure(1, weight=1)
    
    def pantalla_buscar(self):
        self.paginas.select([self.frame_cinco])
        self.frame_cinco.columnconfigure(0, weight=1)
        self.frame_cinco.columnconfigure(1, weight=1)
        self.frame_cinco.columnconfigure(2, weight=1)
        self.frame_cinco.rowconfigure(2, weight=1)
        self.frame_tabla_dos.columnconfigure(0, weight=1)
        self.frame_tabla_dos.rowconfigure(0, weight=1)

    def pantalla_ajustes(self):
        self.paginas.select([self.frame_seis])

    def menu_lateral(self):
        if self.menu is True:
            for i in range(50,170,10):
                self.frame_menu.config(width= i)
                self.frame_inicio.config(width= i)
                self.frame_menu.update()
                clik_inicio = self.bt_cerrar.grid_forget()
                if clik_inicio is None:
                    self.bt_inicio.grid(column=0, row=0, padx =10, pady=10)
                    self.bt_inicio.grid_propagate(0)
                    self.bt_inicio.config(width=i)
                    self.pantalla_inicial()
            self.menu = False
        else:
            for i in range(170,50,-10):
                self.frame_menu.config(width=  i)
                self.frame_inicio.config(width= i)
                self.frame_menu.update()
                clik_inicio = self.bt_inicio.grid_forget()
                if clik_inicio is None:
                    self.frame_menu.grid_propagate(0)
                    self.bt_cerrar.grid(column=0, row=0, padx =10, pady=10)
                    self.bt_cerrar.grid_propagate(0)
                    self.bt_cerrar.config(width=i)
                    self.pantalla_inicial()
                self.menu = True

    def widgets(self):
        self.imagen_inicio = PhotoImage(file ='./GUILogin/imagenes/inicio2.png')
        self.imagen_menu = PhotoImage(file ='./GUILogin/imagenes/menu2.png')
        self.imagen_paciente = PhotoImage(file ='./GUILogin/imagenes/paciente.png')
        self.imagen_calendario = PhotoImage(file ='./GUILogin/imagenes/calendario.png')
        self.imagen_historia_clinica = PhotoImage(file ='./GUILogin/imagenes/historial.png')
        self.imagen_buscar = PhotoImage(file ='./GUILogin/imagenes/buscar.png')
        self.imagen_ajustes = PhotoImage(file ='./GUILogin/imagenes/configuracion.png')
        self.imagen_paciente_nuevo = PhotoImage(file ='./GUILogin/imagenes/add.png')

        self.logo = PhotoImage(file ='./GUILogin/imagenes/logo1.png')
        self.imagen_uno = PhotoImage(file ='./GUILogin/imagenes/imagen_uno.png')
        self.imagen_dos= PhotoImage(file ='./GUILogin/imagenes/imagen_dos.png')        

        self.bt_inicio = Button(self.frame_inicio, image= self.imagen_inicio, bg='black', activebackground='black', bd=0, command = self.menu_lateral)
        self.bt_inicio.grid(column=0, row=0, padx=5, pady=10)
        self.bt_cerrar = Button(self.frame_inicio, image= self.imagen_menu, bg='black', activebackground='black', bd=0, command = self.menu_lateral)
        self.bt_cerrar.grid(column=0, row=0, padx=5, pady=10)

		#BOTONES Y ETIQUETAS DEL MENU LATERAL
        Button(self.frame_menu, image= self.imagen_paciente, bg='black', activebackground='black', bd=0, command = self.pantalla_datos).grid(column=0, row=1, pady=20,padx=10)
        Button(self.frame_menu, image= self.imagen_calendario, bg='black',activebackground='black', bd=0, command =self.pantalla_escribir ).grid(column=0, row=2, pady=20,padx=10)
        Button(self.frame_menu, image= self.imagen_historia_clinica, bg= 'black',activebackground='black', bd=0, command = self.pantalla_actualizar).grid(column=0, row=3, pady=20,padx=10)
        Button(self.frame_menu, image= self.imagen_buscar, bg= 'black',activebackground='black', bd=0, command = self.pantalla_buscar).grid(column=0, row=4, pady=20,padx=10)
        Button(self.frame_menu, image= self.imagen_ajustes, bg= 'black',activebackground='black', bd=0, command = self.pantalla_ajustes).grid(column=0, row=5, pady=20,padx=10)

        Label(self.frame_menu, text= 'Pacientes', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=1, pady=20, padx=2)
        Label(self.frame_menu, text= 'Calendario', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=2, pady=20, padx=2)
        Label(self.frame_menu, text= 'Historia \nClinica', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=3, pady=20, padx=2)
        Label(self.frame_menu, text= 'Eliminar', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=4, pady=20, padx=2)
        Label(self.frame_menu, text= 'Versión', bg= 'black', fg= 'white', font= ('Comic Sans MS', 12, 'bold')).grid(column=1, row=5, pady=20, padx=2)

		#############################  CREAR  PAGINAS  ##############################
        estilo_paginas = ttk.Style()
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

		##############################         PAGINAS       #############################################
		######################## FRAME TITULO #################
        self.titulo = Label(self.frame_top, text= 'Consultorio Odóntologico MyM', bg='black', fg= 'white', font= ('Comic Sans MS', 15, 'bold'))
        self.titulo.pack(expand=1)

		######################## VENTANA PRINCIPAL #################
        Label(self.frame_uno, text= 'Menú Principal', bg='white', fg= 'black', font= ('Comic Sans MS', 20, 'bold')).pack(expand=1)
        Label(self.frame_uno ,image= self.logo, bg='white').pack(expand=1)

		######################## MOSTRAR TODOS LOS PRODUCTOS DE LA BASE DE DATOS MYSQL #################
        Label(self.frame_dos, text= 'Datos de MySQL', bg='white', fg= 'black', font= ('Comic Sans MS', 12, 'bold')).grid(column =0, row=0)
        Button(self.frame_dos, text='ACTUALIZAR',fg='black' ,font = ('Arial', 11,'bold'), bg = 'green2', bd = 2, borderwidth=2).grid(column=1, row=0, pady=5)
        Button(self.frame_dos, image= self.imagen_paciente_nuevo, text='NUEVO', fg='black' ,font = ('Arial', 11,'bold'), bg = 'green2', bd = 2, borderwidth=2).grid(column=2, row=0, pady=5)
        Label(self.frame_dos, text= 'Agregar', bg='white', fg= 'black', font= ('Comic Sans MS', 12, 'bold')).grid(column =2, row=1)
        #command= self.datos_totales, 
  

		#ESTILO DE LAS TABLAS DE DATOS TREEVIEW
        estilo_tabla = ttk.Style()
        estilo_tabla.configure("Treeview", font= ('Comic Sans MS', 10, 'bold'), foreground='black', background='white')  #, fieldbackground='yellow'
        estilo_tabla.map('Treeview', background=[('selected', 'DarkOrchid1')], foreground=[('selected','black')] )
        estilo_tabla.configure('Heading', background = 'white', foreground='navy', padding=3, font= ('Comic Sans MS', 10, 'bold'))
        estilo_tabla.configure('Item', foreground = 'white', focuscolor ='DarkOrchid1')
        estilo_tabla.configure('TScrollbar', arrowcolor = 'DarkOrchid1', bordercolor  ='black', troughcolor= 'DarkOrchid1', background ='white')

		#TABLA UNO
        self.frame_tabla_uno = Frame(self.frame_dos, bg='gray90')
        self.frame_tabla_uno.grid(columnspan=3, row=2, sticky='nsew')
        self.tabla_uno = ttk.Treeview(self.frame_tabla_uno)
        self.tabla_uno.grid(column=0, row=0, sticky='nsew')
        ladox = ttk.Scrollbar(self.frame_tabla_uno, orient = 'horizontal', command= self.tabla_uno.xview)
        ladox.grid(column=0, row = 1, sticky='ew')
        ladoy = ttk.Scrollbar(self.frame_tabla_uno, orient ='vertical', command = self.tabla_uno.yview)
        ladoy.grid(column = 1, row = 0, sticky='ns')

        self.tabla_uno.configure(xscrollcommand = ladox.set, yscrollcommand = ladoy.set)
        self.tabla_uno['columns'] = ('Nombre', 'Modelo', 'Precio', 'Cantidad')
        self.tabla_uno.column('#0', minwidth=100, width=120, anchor='center')
        self.tabla_uno.column('Nombre', minwidth=100, width=130 , anchor='center')
        self.tabla_uno.column('Modelo', minwidth=100, width=120, anchor='center' )
        self.tabla_uno.column('Precio', minwidth=100, width=120 , anchor='center')
        self.tabla_uno.column('Cantidad', minwidth=100, width=105, anchor='center')

        self.tabla_uno.heading('#0', text='Codigo', anchor ='center')
        self.tabla_uno.heading('Nombre', text='Nombre', anchor ='center')
        self.tabla_uno.heading('Modelo', text='Modelo', anchor ='center')
        self.tabla_uno.heading('Precio', text='Precio', anchor ='center')
        self.tabla_uno.heading('Cantidad', text='Cantidad', anchor ='center')
#		self.tabla_uno.bind("<<TreeviewSelect>>", self.obtener_fila)

		######################## REGISTRAR  NUEVOS PRODUCTOS #################
        Label(self.frame_tres, text = 'Agregar Nuevos Datos', fg='blue', bg ='white', font=('Comic Sans MS',24,'bold')).grid(columnspan=2, column=0,row=0, pady=5)
        Label(self.frame_tres, text = 'Codigo', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0,row=1, pady=15, padx=5)
        Label(self.frame_tres, text = 'Nombre', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0,row=2, pady=15)
        Label(self.frame_tres, text = 'Modelo', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0,row=3, pady=15)
        Label(self.frame_tres, text = 'Precio', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0,row=4, pady=15)
        Label(self.frame_tres, text = 'Cantidad', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0,row=5, pady=15)  ##E65561

        Entry(self.frame_tres, textvariable=self.codigo , font=('Comic Sans MS', 12), highlightbackground = "DarkOrchid1", highlightcolor= "green2", highlightthickness=5).grid(column=1, row=1)
        Entry(self.frame_tres, textvariable=self.nombre , font=('Comic Sans MS', 12), highlightbackground = "DarkOrchid1", highlightcolor= "green2", highlightthickness=5).grid(column=1, row=2)
        Entry(self.frame_tres, textvariable=self.modelo , font=('Comic Sans MS', 12), highlightbackground = "DarkOrchid1", highlightcolor= "green2", highlightthickness=5).grid(column=1, row=3)
        Entry(self.frame_tres, textvariable=self.precio , font=('Comic Sans MS', 12), highlightbackground = "DarkOrchid1", highlightcolor= "green2", highlightthickness=5).grid(column=1, row=4)
        Entry(self.frame_tres, textvariable=self.cantidad , font=('Comic Sans MS', 12), highlightbackground = "DarkOrchid1", highlightcolor= "green2", highlightthickness=5).grid(column=1, row=5)

		#Button(self.frame_tres,command= self.agregar_datos, text='REGISTRAR', font=('Arial',10,'bold'), bg='magenta2').grid(column=3,row=6, pady=10, padx=4)
        Label(self.frame_tres, image= self.imagen_uno, bg= 'white').grid(column= 3, rowspan= 5, row = 0, padx= 50)
        self.aviso_guardado = Label(self.frame_tres, bg= 'white', font=('Comic Sans MS', 12), fg='black')
        self.aviso_guardado.grid(columnspan= 2 , column =0, row = 6, padx= 5)

		########################   ACTUALIZAR LOS PRODUCTOS REGISTRADOS     #################
        Label(self.frame_cuatro, text = 'Actualizar Datos',fg='blue', bg ='white', font=('Comic Sans MS',24,'bold')).grid(columnspan=4, row=0)
        Label(self.frame_cuatro, text = 'Ingrese el nombre del producto a actualizar', fg='black', bg ='white', font=('Comic Sans MS',12)).grid(columnspan=2, row=1)
        Entry(self.frame_cuatro, textvariable= self.buscar_actualiza, font=('Comic Sans MS', 12), highlightbackground = "magenta2", width=12, highlightthickness=5).grid(column=2, row=1, padx=5)
		#Button(self.frame_cuatro, command= self.actualizar_datos, text='BUSCAR', font=('Arial',12,'bold'), bg='deep sky blue').grid(column=3,row=1, pady=5, padx=15)
        self.aviso_actualizado = Label(self.frame_cuatro, fg='black', bg ='white', font=('Comic Sans MS',12,'bold'))
        self.aviso_actualizado.grid(columnspan= 2, row=7, pady=10, padx=5)
        
        Label(self.frame_cuatro, text = 'Codigo', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0, row=2, pady=15, padx=10)
        Label(self.frame_cuatro, text = 'Nombre', fg='navy', bg ='white', font=('Comic Sans MSl',13,'bold')).grid(column=0, row=3, pady=15)
        Label(self.frame_cuatro, text = 'Modelo', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0, row=4, pady=15)
        Label(self.frame_cuatro, text = 'Precio', fg='navy',bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0, row=5, pady=15)
        Label(self.frame_cuatro, text = 'Cantidad', fg='navy', bg ='white', font=('Comic Sans MS',13,'bold')).grid(column=0, row=6, pady=15)  ##E65561

        Entry(self.frame_cuatro, textvariable=self.codigo, font=('Comic Sans MS', 12), highlightbackground = "deep sky blue", highlightcolor= "green", highlightthickness=5).grid(column=1,row=2)
        Entry(self.frame_cuatro, textvariable=self.nombre, font=('Comic Sans MS', 12), highlightbackground = "deep sky blue", highlightcolor= "green", highlightthickness=5).grid(column=1,row=3)
        Entry(self.frame_cuatro, textvariable=self.modelo, font=('Comic Sans MS', 12), highlightbackground = "deep sky blue", highlightcolor= "green", highlightthickness=5).grid(column=1,row=4)
        Entry(self.frame_cuatro, textvariable=self.precio, font=('Comic Sans MS', 12), highlightbackground = "deep sky blue", highlightcolor= "green", highlightthickness=5).grid(column=1,row=5)
        Entry(self.frame_cuatro, textvariable=self.cantidad, font=('Comic Sans MS', 12), highlightbackground = "deep sky blue", highlightcolor= "green", highlightthickness=5).grid(column=1,row=6)

		#Button(self.frame_cuatro,command= self.actualizar_tabla, text='ACTUALIZAR', font=('Arial',12,'bold'), bg='magenta2').grid(column=2, columnspan= 2 ,row=7, pady=2)
        Label(self.frame_cuatro, image= self.imagen_dos, bg='white').grid(column= 2,columnspan= 2, rowspan= 5, row = 1, padx=2)

		######################## BUSCAR y ELIMINAR DATOS #################
        Label(self.frame_cinco, text = 'Buscar y Eliminar Datos', fg='blue', bg ='white', font=('Comic Sans MS',24,'bold')).grid(columnspan= 4,  row=0,sticky='nsew',padx=2)
        Entry(self.frame_cinco, textvariable= self.buscar, font=('Comic Sans MS', 12),highlightbackground = "DarkOrchid1", highlightcolor= "deep sky blue", highlightthickness=5).grid(column=0, row=1, sticky='nsew', padx=2)
		#Button(self.frame_cinco,command = self.buscar_nombre, text='BUSCAR POR NOMBRE', font=('Arial',8,'bold'), bg='deep sky blue').grid(column = 1, row=1, sticky='nsew', padx=2)
		#Button(self.frame_cinco,command = self.eliminar_fila, text='ELIMINAR', font=('Arial',8,'bold'), bg='red').grid(column = 2, row=1, sticky='nsew',padx=2)
        self.indica_busqueda= Label(self.frame_cinco, width= 15, text = '', fg='blue', bg ='white', font=('Comic Sans MS',12,'bold'))
        self.indica_busqueda.grid(column = 3, row=1, padx=2)

		#TABLA DOS
        self.frame_tabla_dos = Frame(self.frame_cinco, bg= 'gray90')
        self.frame_tabla_dos.grid(columnspan=4, row=2, sticky='nsew')
        self.tabla_dos = ttk.Treeview(self.frame_tabla_dos)
        self.tabla_dos.grid(column=0, row=0, sticky='nsew')
        ladox = ttk.Scrollbar(self.frame_tabla_dos, orient = 'horizontal', command= self.tabla_dos.xview)
        ladox.grid(column=0, row = 1, sticky='ew')
        ladoy = ttk.Scrollbar(self.frame_tabla_dos, orient ='vertical', command = self.tabla_dos.yview)
        ladoy.grid(column = 1, row = 0, sticky='ns')

        self.tabla_dos.configure(xscrollcommand = ladox.set, yscrollcommand = ladoy.set,)
        self.tabla_dos['columns'] = ('Nombre', 'Modelo', 'Precio', 'Cantidad')
        self.tabla_dos.column('#0', minwidth=100, width=120, anchor='center')
        self.tabla_dos.column('Nombre', minwidth=100, width=130 , anchor='center')
        self.tabla_dos.column('Modelo', minwidth=100, width=120, anchor='center' )
        self.tabla_dos.column('Precio', minwidth=100, width=120 , anchor='center')
        self.tabla_dos.column('Cantidad', minwidth=100, width=105, anchor='center')

        self.tabla_dos.heading('#0', text='Codigo', anchor ='center')
        self.tabla_dos.heading('Nombre', text='Nombre', anchor ='center')
        self.tabla_dos.heading('Modelo', text='Modelo', anchor ='center')
        self.tabla_dos.heading('Precio', text='Precio', anchor ='center')
        self.tabla_dos.heading('Cantidad', text='Cantidad', anchor ='center')
#		self.tabla_dos.bind("<<TreeviewSelect>>", self.obtener_fila)

		######################## AJUSTES #################
        self.text_ajustes = Label(self.frame_seis, text = 'Configuracion',fg='blue', bg ='white', font=('Comic Sans MS',28,'bold'))
        self.text_ajustes.pack(expand=1)
        self.texto = Label(self.frame_seis, text = '@autor:AdriaTech \n Desarrollado en Python',fg='red', bg ='white', font=('Comic Sans MS',18))
        self.texto.pack(expand=1)
                
        self.ventana.mainloop()