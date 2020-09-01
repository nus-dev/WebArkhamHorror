export class LeftBarVC {
    private readonly leftBarMenu: HTMLElement;
    private readonly leftBarHandle: HTMLElement;

    constructor() {
        this.leftBarMenu = document.getElementById('leftBarMenu');
        this.leftBarHandle = document.getElementById('leftBarHandle');

        const onClick = () => {
            if (this.leftBarMenu.classList.contains('expand')) {
                this.leftBarMenu.classList.remove('expand');
                this.leftBarHandle.textContent = '>>';
            } else {
                this.leftBarMenu.classList.add('expand');
                this.leftBarHandle.textContent = '<<';
            }
        };
        this.leftBarHandle.addEventListener('click', (ev) =>{
            this.leftBarHandle.removeEventListener('click', onClick);
            onClick();
            this.leftBarHandle.addEventListener('click', onClick);
        });
    }
}