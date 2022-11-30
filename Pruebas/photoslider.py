from tkinter import *
root = Tk()
root.title("Photo Slider")
root.geometry('700x300')
root.resizable(False, False)

def onclick_next():
    image_show_box_photo.configure(file='imagen_dos.png')
def onclick_back():
    image_show_box_photo.configure(file='imagen_uno.png')

back_button_photo=PhotoImage(file='back.png')
back_button_label = Label(root, image=back_button_photo, border=0)
back_button_label.place(x=50, y=100)

next_button_photo=PhotoImage(file='next.png')
next_button_label = Label(root, image=next_button_photo, border=0)
next_button_label.place(x=50*10, y=100)

image_show_box_photo = PhotoImage(file='imagen_uno.png')
image_show_box_label = Label(root, image=image_show_box_photo, border=0)
image_show_box_label.place(x=250, y=100)

back_button_label.bind("<Button>", lambda e: onclick_next())
next_button_label.bind("<Button>", lambda e: onclick_back())
root.mainloop()