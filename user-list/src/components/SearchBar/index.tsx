import './style.css';

export default function SearchBarComponent(props:
    {
        placeholder: string,
        buttonText: string,
    }) {

    return (
        <section className="search">
            <input type="text" placeholder={props.placeholder} />
            <button className='seach__button'>{props.buttonText}</button>
        </section>
    )
}