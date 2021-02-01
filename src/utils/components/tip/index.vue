<template>
    <div class='tip-wrapper' v-if='options.show'>
        <p>
            <img v-bind:src='options.success?icon_url_success:icon_url_error'></img>
            <span>{{options.msg}}</span>
        </p>
    </div>
</template>
<script>
export default {
    name: 'tip',
    data: function(){
        return {
            icon_url_success: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAAttJREFUWAnNmL1rFEEYxm8Tvz/CBQRBiCDYWNoagqCJKMbirNUujbXY2oiFNvkDREgnWokG8YMEP6KNiJWYQgRRC0UTjYqieP6edfd8b253b/d2LrkXHmbm/Xx2Z3dmdoNKQanX64OEHAZjYDvYFoGm8i7Ca9o7YDoIggVa/wKRGpgBv0Beka9iat4YkWwYzIGyohzDHRMjuB9MlmWREK+c/YWIEVAFtxOS+VIpdzUXKTmC574qZ+RRjWxSOGiaunlnXH6qlT59GLvxzLgk3PFk4tThpbdppaTx9vUZdhdM33f3EwkfgM8pic836bktWvS6JVoYtbpXaLeClymF/i+eOCioG/KYpBvt1TM+lVJoRn59GMV+xAZ56j8jzyH2sm9OPvuYWNOIuMg4DlZZi4f+C3IcgMyizUXBTYwnrM70xWFchLRr+5RXJBuFzAebFDLrGF8DO63e6Y+J0JCjLDPU8UNk3tokkFnN+ArYZ/UJ/SE9+fMgS35gfAoWspywvQe73CLo9JxeBnlkXoSWMjw/YguL0A6A6RTfRfS7E8gE6C+mxCSpl9oROmeLkGEtcPe6r+j2WL+4j77oVvSl3ZSdiZPHLUU2gPtAouncH9tsi/6sHApKOGWzGUFvsG2xhdRHtxk8BEdcW2Q/ja0TmVXyqTaRT7APuIXR6Q1tEfQn2+TLMk+J0PEsj8imKVrfUt1R4HMC/IliOmmOidAgyPMlcRM/rSeJgu0o+A06FXHQNhY+E3k316sEtZzw0B0EP0EZCTfXmFCR48clqgZh4L+L2cv4exkmUWxNOW3iOcaJ64kcHbnH+DrYASbAGlBGHrHdNE6NYSJY9sQRtumqIFV0ZfUwU/XkQ76YkX25P4NuqWbTXXEHOFRBb3woxuQiUu4mitqbKHc1rperJaB3fjZYxhDT27fyv2MsKfUhtSw/rBoLo0sgbQwx7Tf6UhkFWb/07mK/wYJX6JfeX9I45KlibxiZAAAAAElFTkSuQmCC",
            icon_url_error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMA+rAD0Qfs3ztB8O/MunRsWyLocmKSiVUZMwyaqF/CoY9lT9gShCfy07Mt3dSnpwAAAkRJREFUWMOc1OeOwjAQBOBxKiWkE1IAHeGaNO//focOJFsouyR8f23Jq9WMofC7uvGCODImigOvqTsfb2gzb8snWy9rsUiY7yjY5SHm6tOSijLtMYdfRXwhqny8tAo4Q7CCLtxzpn0IRZFwtqSAaL3hAps1BAfDRcwBky5c7DI5D98wMdPa8A1mjSeFtOdg+LgZAmnjxVN+EuHeiIdReCkJ4ZJyeLJXTlIy4Vhx2hWOK6c5bfGlDRzhOEpbtA2uKBjgGCio8NBHFHjKRFbU4y6l5AzHjpIU/8KSkl84EkrKewRyiko4YoryFyPTwPFD0Q43LRWfTvgpMy2AjArbJP3BDIBHS0vtNxUe4G+pGNUaWVsfHS21tCM1HWpqUr39Vo2GmgZqIa3G3bXe2i9qPAT6uf73WQFias56+a0YETVXvfxWBKOf6+W3DAxVf72Y3Q6CMAyFYXMMnISfYKL4sxs10b7/+0lMZq88XdLgd70QSjntzrFQ/EzJpUmqDcKre4I8vguCIJ7bL6j2RkL7TeYt4UUQI0iE7ulBPQkSmYTaHf9GWLRHwpwsryw4RmwgzK6r6+lJmGB51KowPPx1dLwdVJQH7gdgO5JAm/OHxKEohkiQHlwi+PIjt390fEgckdeMXTNXsB0LuLnVnLFpmnSmQdXzZRR/xgWgyY3N2esxHYl4ZMlLq5Eq20MLwYRPcZfwU9NOMDWMPxtPJJgavc1az/jprajeHOvt+soBgj7S0Ics+thHH0Tpo7Gy7d1fwjp9fPgGuhhbZCSt8JkAAAAASUVORK5CYII=",
            options: {
                success: true,
                show: false,
                msg: ''
            }
        }
    }
}
</script>
<style lang="less">
.tip-wrapper{
    width:90%;
    position:fixed;
    top:50%;
    left:50%;
    text-align:center;
    z-index: 999999;
    transform: translate(-50%, -50%);
    p{
        display:inline-block; 
        z-index: 99999;  
        line-height: 0.506rem; 
        color: white; font-size: .37333rem; 
        word-break: break-all;padding: 0.426rem 0.346rem; 
        margin:0 auto;  
        background: rgba(0, 0, 0, 0.7); 
        border-radius: 10px;
    }
    img{
        position:absolute;
        top:50%;
        width:0.48rem;
        height:0.48rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        margin-right:10px;
    }
    span{
        margin-left:0.8rem;
        text-align:left;
        display:inline-block;
    }
}
</style>
