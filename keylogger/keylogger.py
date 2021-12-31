from pynput import keyboard

def on_press(key):
    try:
        #La idea de esto es que en vez de hacer print(debamos hacer requests)
        #para mandar todos los datos y crear un registro del codigo del producto
        print('Alphanumeric key pressed: {0} '.format(
            key.char))
    except AttributeError:
        print('special key pressed: {0}'.format(
            key))

def on_release(key):
    print('Key released: {0}'.format(
        key))
    if key == keyboard.Key.esc:
        # Stop listener
        return False

# Collect events until released
with keyboard.Listener(
        on_press=on_press) as listener:
    listener.join()
