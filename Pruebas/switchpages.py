import tkinter as tk

root=tk.Tk()
root.geometry('500x400')
root.title('Switch Page')

def reset_indicators():
    home_indicate.config(bg='gray')
    menu_indicate.config(bg='gray')
    contact_indicate.config(bg='gray')
    about_indicate.config(bg='gray')

def delete_pages():
    for frame in main_frame.winfo_children():
        frame.destroy()

def indicate(lb, page):
    reset_indicators()
    lb.config(bg='blue')
    delete_pages()
    page()

def home_page():
    home_frame = tk.Frame(main_frame)
    lb = tk.Label(home_frame, text='HOME', font=('Bold', 30))
    lb.pack()
    home_frame.pack(pady=20)
    
def menu_page():
    menu_frame = tk.Frame(main_frame)
    lb = tk.Label(menu_frame, text='MENU', font=('Bold', 30))
    lb.pack()
    menu_frame.pack(pady=20)

def contact_page():
    contact_frame = tk.Frame(main_frame)
    lb = tk.Label(contact_frame, text='CONTACTO', font=('Bold', 30))
    lb.pack()
    contact_frame.pack(pady=20)

def about_page():
    about_frame = tk.Frame(main_frame)
    lb = tk.Label(about_frame, text='ACERCA DE', font=('Bold', 30))
    lb.pack()
    about_frame.pack(pady=20)


options_frame = tk.Frame(root, bg='gray')

options_frame.pack(side=tk.LEFT)
options_frame.pack_propagate(False)
options_frame.configure(width=120, height=400)

main_frame = tk.Frame(root, highlightbackground='black', highlightthickness=2)
main_frame.pack(side=tk.LEFT)
main_frame.pack_propagate(False)
main_frame.configure(width=500, height=400)

home_button = tk. Button(options_frame, text='Home', font=('Bold', 15), fg='blue', bd=0, bg='gray', command=lambda: indicate(home_indicate, home_page))
home_button.place(x=10, y=50)
menu_button = tk. Button(options_frame, text='Menu', font=('Bold', 15), fg='blue', bd=0, bg='gray', command=lambda: indicate(menu_indicate, menu_page))
menu_button.place(x=10, y=100)
contact_button = tk. Button(options_frame, text='Contacto', font=('Bold', 15), fg='blue', bd=0, bg='gray', command=lambda: indicate(contact_indicate, contact_page))
contact_button.place(x=10, y=150)
about_button = tk. Button(options_frame, text='Acerca de', font=('Bold', 15), fg='blue', bd=0, bg='gray', command=lambda: indicate(about_indicate, about_page))
about_button.place(x=10, y=200)

home_indicate = tk.Label(options_frame, text='', bg='gray')
home_indicate.place(x=3, y=50, height=40)
menu_indicate = tk.Label(options_frame, text='', bg='gray')
menu_indicate.place(x=3, y=100, height=40)
contact_indicate = tk.Label(options_frame, text='', bg='gray')
contact_indicate.place(x=3, y=150, height=40)
about_indicate = tk.Label(options_frame, text='', bg='gray')
about_indicate.place(x=3, y=200, height=40)


root.mainloop()