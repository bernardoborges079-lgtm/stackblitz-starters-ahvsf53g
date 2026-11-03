class Interface {
    static notasPorDisciplina = {
      matematica: { n1: '', n2: '', n3: '' },
      portugues: { n1: '', n2: '', n3: '' },
      ciencia: { n1: '', n2: '', n3: '' },
      historia: { n1: '', n2: '', n3: '' },
      geografia: { n1: '', n2: '', n3: '' }
    };
  
    static medias = {
      matematica: null,
      portugues: null,
      ciencia: null,
      historia: null,
      geografia: null
    };
  
    static carregarNotasDisciplina() {
      const disc = document.getElementById('disciplina').value;
      const n1 = document.getElementById('n1');
      const n2 = document.getElementById('n2');
      const n3 = document.getElementById('n3');
  
      if (!disc) {
        n1.value = '';
        n2.value = '';
        n3.value = '';
        return;
      }
  
      n1.value = Interface.notasPorDisciplina[disc].n1;
      n2.value = Interface.notasPorDisciplina[disc].n2;
      n3.value = Interface.notasPorDisciplina[disc].n3;
    }
  
    static registrarNotas() {
      const disc = document.getElementById('disciplina').value;
      if (!disc) return;
  
      const v1 = document.getElementById('n1').value;
      const v2 = document.getElementById('n2').value;
      const v3 = document.getElementById('n3').value;
  
      Interface.notasPorDisciplina[disc].n1 = v1;
      Interface.notasPorDisciplina[disc].n2 = v2;
      Interface.notasPorDisciplina[disc].n3 = v3;
  
      if (v1 !== '' && v2 !== '' && v3 !== '') {
        const temp = new Aluno();
        Interface.medias[disc] = temp.gerarMedia(Number(v1), Number(v2), Number(v3));
      } else {
        Interface.medias[disc] = null;
      }
  
      Interface.validarPreenchimento();
    }
  
    static validarPreenchimento() {
      const nome = document.getElementById('nome').value.trim();
      const btnSalvar = document.getElementById('btn-salvar');
  
      const todasCompletas = Object.values(Interface.medias).every(m => m !== null);
  
      if (nome !== '' && todasCompletas) {
        btnSalvar.disabled = false;
      } else {
        btnSalvar.disabled = true;
      }
    }
  
    static salvar() {
      let nome = document.getElementById('nome').value;
  
      let a1 = new Aluno(
        nome,
        Interface.medias.matematica,
        Interface.medias.portugues,
        Interface.medias.ciencia,
        Interface.medias.historia,
        Interface.medias.geografia
      );
  
      alert('Aluno cadastrado com sucesso!');
      Interface.resetarFormulario();
      return a1;
    }
  
    static resetarFormulario() {
      document.getElementById('nome').value = '';
      document.getElementById('disciplina').value = '';
      document.getElementById('n1').value = '';
      document.getElementById('n2').value = '';
      document.getElementById('n3').value = '';
  
      Interface.medias = {
        matematica: null,
        portugues: null,
        ciencia: null,
        historia: null,
        geografia: null
      };
  
      Interface.notasPorDisciplina = {
        matematica: { n1: '', n2: '', n3: '' },
        portugues: { n1: '', n2: '', n3: '' },
        ciencia: { n1: '', n2: '', n3: '' },
        historia: { n1: '', n2: '', n3: '' },
        geografia: { n1: '', n2: '', n3: '' }
      };
  
      document.getElementById('btn-salvar').disabled = true;
    }
  
    static listar(turma) {
      const btnCadastrar = document.getElementById('btn-cadastrar');
      const tabCadastrar = document.getElementById('tab-cadastrar');
      const btnListar = document.getElementById('btn-listar');
      const tabListar = document.getElementById('tab-listar');
  
      btnListar.classList.add('active');
      btnCadastrar.classList.remove('active');
      tabListar.classList.add('active');
      tabCadastrar.classList.remove('active');
  
      const container = document.getElementById('alunos');
  
      if (turma.length === 0) {
        container.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
        return;
      }
  
      let html = '';
      const temp = new Aluno();
  
      for (let i = 0; i < turma.length; i++) {
        let al = turma[i];
        html += `
          <div style="margin-bottom: 20px;">
            <h4 style="margin: 0 0 8px 0; color: #007bff;">Aluno: ${al.getNome()}</h4>
            <table>
              <tr>
                <th>Disciplina</th>
                <th>Média</th>
                <th>Situação</th>
              </tr>
              <tr>
                <td>Matemática</td>
                <td>${al.matematica.toFixed(1)}</td>
                <td>${temp.gerarEstado(al.matematica)}</td>
              </tr>
              <tr>
                <td>Português</td>
                <td>${al.portugues.toFixed(1)}</td>
                <td>${temp.gerarEstado(al.portugues)}</td>
              </tr>
              <tr>
                <td>Ciência</td>
                <td>${al.ciencia.toFixed(1)}</td>
                <td>${temp.gerarEstado(al.ciencia)}</td>
              </tr>
              <tr>
                <td>História</td>
                <td>${al.historia.toFixed(1)}</td>
                <td>${temp.gerarEstado(al.historia)}</td>
              </tr>
              <tr>
                <td>Geografia</td>
                <td>${al.geografia.toFixed(1)}</td>
                <td>${temp.gerarEstado(al.geografia)}</td>
              </tr>
            </table>
          </div>
        `;
      }
      container.innerHTML = html;
    }
  
    static cadastrar() {
      const btnCadastrar = document.getElementById('btn-cadastrar');
      const tabCadastrar = document.getElementById('tab-cadastrar');
      const btnListar = document.getElementById('btn-listar');
      const tabListar = document.getElementById('tab-listar');
  
      btnListar.classList.remove('active');
      btnCadastrar.classList.add('active');
      tabListar.classList.remove('active');
      tabCadastrar.classList.add('active');
    }
  }