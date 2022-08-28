class Check {
    isMobile() {
        if(!this.isMobileChecked) {
            this.isMobileChecked = true
            this.isMobileCheck = document.documentElement.classList.contains("mobile")
        }
        return this.isMobileChecked 
    }
    
    isWebPSupported() {
        if (!this.isWebPChecked) {
            this.isWebPChecked = true
            const canvas = document.createElement("canvas")
            if(canvas.getContext && canvas.getContext('2d')) {
                this.isWebPCheck = 0 === canvas.toDataURL("image/webp").indexOf("data:image/webp")
            }
        }
        return this.isWebPCheck
    }
}

export const check = new Check()