function Message() {
    const name = 'Momo';
    if (name)
        return <h1>Hello {name}</h1>;
    return <h1>Hellp World</h1>;
}

export default Message;