let initialCards = [
    {
        id: 1,
        title: "O que é CSS",
        skill: "CSS",
        category: "FrontEnd",
        description: "Cascading Style Sheets é um mecanismo para adicionar estilo a um documento web. O código CSS pode ser aplicado diretamente nas tags ou ficar contido dentro das tags <style>. Também é possível, em vez de colocar a formatação dentro do documento, criar um link para um arquivo CSS que contém os estilos",
        link: "",
    },
    {
        id: 2,
        title: "O que é HTML",
        skill: "HTML",
        category: "FrontEnd",
        description: "HTML é uma linguagem de marcação utilizada na construção de páginas na Web. Documentos HTML podem ser interpretados por navegadores. A tecnologia é fruto da junção entre os padrões HyTime e SGML. HyTime é um padrão para a representação estruturada de hipermídia e conteúdo baseado em tempo",
        link: "",
    },
    {
        id: 3,
        title: "O que é JavaScript",
        skill: "Javascript",
        category: "FullStack",
        description: "JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web.",
        link: "",
    },
    {
        id: 4,
        title: "O que é Node.js",
        skill: "Node.js",
        category: "FullStack",
        description: "Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.",
        link: "",
    },
    {
        id: 5,
        title: "O que é SoftSkill",
        skill: "SoftSkill",
        category: "SoftSkill",
        description: "Soft skills é um termo em inglês usado por profissionais de recursos humanos para definir habilidades comportamentais, competências subjetivas difíceis de avaliar. Também são conhecidas como people skills e interpersonal skills.",
        link: "",
    },
]

export function initialPopulate() {

    if (!localStorage.getItem('listCards')) {
        console.log(localStorage.getItem('listCards'));
        localStorage.setItem('listCards', JSON.stringify(initialCards));
    }
}